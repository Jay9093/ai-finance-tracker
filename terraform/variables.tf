variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
  default     = "finance-tracker-cluster"
}

variable "repository_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "finance-tracker"
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "financetracker"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "use_custom_domain" {
  description = "Whether to use a custom domain"
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "Custom domain name"
  type        = string
  default     = ""
} 