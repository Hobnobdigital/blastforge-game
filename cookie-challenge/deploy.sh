#!/bin/bash

# Cookie Challenge - Vercel Deployment Script
# Usage: ./deploy.sh [environment]
#   environment: 'preview' (default) or 'production'

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Cookie Challenge - Vercel Deployer${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Error: Vercel CLI is not installed${NC}"
    echo "Install it with: npm i -g vercel"
    exit 1
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Warning: Not logged in to Vercel${NC}"
    echo "Please login first: vercel login"
    exit 1
fi

# Get environment argument
ENV=${1:-preview}

# Validate environment
if [[ "$ENV" != "preview" && "$ENV" != "production" ]]; then
    echo -e "${RED}Error: Invalid environment. Use 'preview' or 'production'${NC}"
    exit 1
fi

# Check if index.html exists
if [[ ! -f "index.html" ]]; then
    echo -e "${YELLOW}Warning: index.html not found in current directory${NC}"
    echo "Make sure your game code is ready before deploying."
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${BLUE}Deploying to: ${YELLOW}$ENV${NC}"
echo ""

if [[ "$ENV" == "production" ]]; then
    echo -e "${YELLOW}⚠️  DEPLOYING TO PRODUCTION${NC}"
    echo -e "${YELLOW}   This will update the live site!${NC}"
    echo ""
    read -p "Are you sure? Type 'deploy' to confirm: " confirm
    if [[ "$confirm" != "deploy" ]]; then
        echo -e "${RED}Deployment cancelled${NC}"
        exit 1
    fi
    echo ""
    echo -e "${BLUE}Running: vercel --prod${NC}"
    vercel --prod
else
    echo -e "${BLUE}Running: vercel (preview deployment)${NC}"
    vercel
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Project: ${NC}cookie-challenge"
echo -e "${BLUE}Environment: ${NC}$ENV"
echo ""
echo -e "${YELLOW}Check your Vercel dashboard for the deployment URL${NC}"
