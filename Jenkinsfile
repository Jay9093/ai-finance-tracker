pipeline {
    agent any
    
    triggers {
        // Poll every 2 minutes
        pollSCM('H/2 * * * *')
    }
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-credentials-file')
        AWS_SECRET_ACCESS_KEY = credentials('aws-credentials-file')
        AWS_DEFAULT_REGION = 'us-east-1'
        DOCKER_IMAGE = 'finance-tracker'
        ECR_REPOSITORY = 'finance-tracker'
        ECR_REGISTRY = '061051249522.dkr.ecr.us-east-1.amazonaws.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm run test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                        docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${ECR_REGISTRY}/${ECR_REPOSITORY}:${BUILD_NUMBER}
                        docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:${BUILD_NUMBER}
                    """
                }
            }
        }
        
        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                    sh 'terraform plan -out=tfplan'
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh """
                        aws ecs update-service --cluster finance-tracker-cluster \
                            --service finance-tracker-service \
                            --force-new-deployment
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 