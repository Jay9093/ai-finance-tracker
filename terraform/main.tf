provider "aws" {
  region = var.aws_region
}

# VPC Configuration
module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr = var.vpc_cidr
  environment = var.environment
}

# ECS Cluster
module "ecs" {
  source = "./modules/ecs"
  
  cluster_name = var.cluster_name
  environment = var.environment
  vpc_id = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets = module.vpc.public_subnets
}

# RDS Database
module "rds" {
  source = "./modules/rds"
  
  environment = var.environment
  vpc_id = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  db_name = var.db_name
  db_username = var.db_username
  db_password = var.db_password
}

# Application Load Balancer
module "alb" {
  source = "./modules/alb"
  
  environment = var.environment
  vpc_id = module.vpc.vpc_id
  public_subnets = module.vpc.public_subnets
  cluster_name = var.cluster_name
}

# ECR Repository
module "ecr" {
  source = "./modules/ecr"
  
  repository_name = var.repository_name
  environment = var.environment
}

# CloudWatch Logs
module "cloudwatch" {
  source = "./modules/cloudwatch"
  
  environment = var.environment
  cluster_name = var.cluster_name
}

# Route53 (if using custom domain)
module "route53" {
  source = "./modules/route53"
  count = var.use_custom_domain ? 1 : 0
  
  domain_name = var.domain_name
  alb_dns_name = module.alb.alb_dns_name
  alb_zone_id = module.alb.alb_zone_id
} 