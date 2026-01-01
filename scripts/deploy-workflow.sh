#!/bin/bash
#
# GenuVerity Deploy Workflow Helper
#
# Usage:
#   ./scripts/deploy-workflow.sh new <branch-name>   # Start new feature branch
#   ./scripts/deploy-workflow.sh test [url]          # Run tests (defaults to localhost)
#   ./scripts/deploy-workflow.sh status              # Check current branch status
#   ./scripts/deploy-workflow.sh promote             # Merge to main and push
#

set -e

COMMAND=$1
ARG=$2

case $COMMAND in
    new)
        if [ -z "$ARG" ]; then
            echo "Usage: ./scripts/deploy-workflow.sh new <branch-name>"
            echo "Example: ./scripts/deploy-workflow.sh new fix/form-overlap"
            exit 1
        fi
        echo "Creating new branch: $ARG"
        git checkout -b "$ARG"
        echo ""
        echo "✓ Branch created. Make your changes, then:"
        echo "  1. git add . && git commit -m 'Your message'"
        echo "  2. git push origin $ARG"
        echo "  3. Wait for Vercel preview URL in GitHub/Vercel"
        echo "  4. ./scripts/deploy-workflow.sh test <preview-url>"
        echo "  5. ./scripts/deploy-workflow.sh promote"
        ;;

    test)
        URL=${ARG:-"http://localhost:8000"}
        echo "Running tests against: $URL"
        echo ""
        node scripts/test-deploy.js "$URL"
        ;;

    status)
        echo "=== Git Status ==="
        BRANCH=$(git rev-parse --abbrev-ref HEAD)
        echo "Current branch: $BRANCH"
        echo ""
        if [ "$BRANCH" = "main" ]; then
            echo "⚠️  You're on main. Create a feature branch first:"
            echo "   ./scripts/deploy-workflow.sh new fix/your-fix-name"
        else
            echo "Remote branches:"
            git branch -r | grep "$BRANCH" || echo "  (not pushed yet)"
            echo ""
            echo "Local changes:"
            git status --short
            echo ""
            echo "Next steps:"
            if [ -n "$(git status --porcelain)" ]; then
                echo "  1. git add . && git commit -m 'Your message'"
                echo "  2. git push origin $BRANCH"
            else
                echo "  1. git push origin $BRANCH (if not pushed)"
                echo "  2. Test preview URL: ./scripts/deploy-workflow.sh test <url>"
                echo "  3. Merge to prod: ./scripts/deploy-workflow.sh promote"
            fi
        fi
        ;;

    promote)
        BRANCH=$(git rev-parse --abbrev-ref HEAD)
        if [ "$BRANCH" = "main" ]; then
            echo "❌ Already on main. Nothing to promote."
            exit 1
        fi

        echo "=== Promoting $BRANCH to main ==="
        echo ""

        # Check for uncommitted changes
        if [ -n "$(git status --porcelain)" ]; then
            echo "❌ You have uncommitted changes. Commit or stash them first."
            git status --short
            exit 1
        fi

        # Confirm
        read -p "Merge '$BRANCH' into main and push to production? (y/N) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Aborted."
            exit 0
        fi

        git checkout main
        git pull origin main
        git merge "$BRANCH" --no-edit
        git push origin main

        echo ""
        echo "✓ Merged and pushed to main"
        echo "✓ Vercel will auto-deploy to production"
        echo ""
        echo "Clean up branch? (optional)"
        echo "  git branch -d $BRANCH"
        echo "  git push origin --delete $BRANCH"
        ;;

    *)
        echo "GenuVerity Deploy Workflow"
        echo ""
        echo "Usage:"
        echo "  ./scripts/deploy-workflow.sh new <branch-name>  - Start new feature branch"
        echo "  ./scripts/deploy-workflow.sh test [url]         - Run pre-deploy tests"
        echo "  ./scripts/deploy-workflow.sh status             - Check current state"
        echo "  ./scripts/deploy-workflow.sh promote            - Merge to main & deploy"
        echo ""
        echo "Typical workflow:"
        echo "  1. ./scripts/deploy-workflow.sh new fix/my-fix"
        echo "  2. Make changes, commit, push"
        echo "  3. Copy Vercel preview URL from GitHub"
        echo "  4. ./scripts/deploy-workflow.sh test https://preview-url.vercel.app"
        echo "  5. ./scripts/deploy-workflow.sh promote"
        ;;
esac
