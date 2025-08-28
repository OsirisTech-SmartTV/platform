# Publishing Guide

This document explains how to publish the `@osiris-smarttv/platform` package to npm.

## Prerequisites

1. **npm Account**: You need an npm account with access to the `@osiris-smarttv` organization
2. **Authentication**: Login to npm using `npm login`
3. **Access Rights**: Ensure you have publish rights to the organization

## Setup npm Login

```bash
# Login to npm
npm login

# Verify your login
npm whoami
```

## Publishing Process

### Method 1: Manual Publishing

```bash
# 1. Ensure everything is built and tested
npm run build
npm test

# 2. Update version (choose one)
npm version patch    # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor    # 1.0.0 -> 1.1.0 (new features)
npm version major    # 1.0.0 -> 2.0.0 (breaking changes)

# 3. Publish to npm
npm publish
```

### Method 2: Using Package Scripts

```bash
# For patch releases (bug fixes)
npm run release:patch

# For minor releases (new features)
npm run release:minor

# For major releases (breaking changes)
npm run release:major
```

## Available Scripts

- `npm run publish:npm` - Publish current version to npm
- `npm run version:patch` - Bump patch version
- `npm run version:minor` - Bump minor version  
- `npm run version:major` - Bump major version
- `npm run release:patch` - Version bump + publish (patch)
- `npm run release:minor` - Version bump + publish (minor)
- `npm run release:major` - Version bump + publish (major)

## Pre-publish Checklist

- [ ] All tests pass (`npm test`)
- [ ] Code builds successfully (`npm run build`)
- [ ] Documentation is up to date
- [ ] Version number is appropriate
- [ ] Git working directory is clean
- [ ] You're logged into npm with correct account

## Package Configuration

The package is configured with:
- **Public access**: Anyone can install the package
- **Scoped package**: `@osiris-smarttv/platform`
- **Registry**: https://registry.npmjs.org/
- **Auto-build**: `prepublishOnly` script runs build before publish

## First Time Setup

For organization members publishing for the first time:

```bash
# Ensure you're part of the @osiris-smarttv organization
npm org ls osiris-smarttv

# If not a member, request access from organization owner
```

## Version Strategy

Follow [Semantic Versioning](https://semver.org/):

- **PATCH** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes

## Troubleshooting

### Authentication Issues
```bash
npm login
npm whoami
```

### Permission Issues
```bash
# Check if you have publish rights
npm access ls-collaborators @osiris-smarttv/platform
```

### Build Issues
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

## Post-publish

After successful publishing:

1. **Verify**: Check the package on [npmjs.com](https://www.npmjs.com/package/@osiris-smarttv/platform)
2. **Test Installation**: Try installing in a test project
3. **Tag Release**: Create a git tag for the version
4. **Update Changelog**: Document the changes

```bash
# Create git tag
git tag v1.0.0
git push origin v1.0.0

# Test installation
mkdir test-install && cd test-install
npm init -y
npm install @osiris-smarttv/platform
```