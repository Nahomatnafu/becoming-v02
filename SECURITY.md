# 🔒 Security Guide

## Environment Variables

This application uses environment variables to store sensitive configuration. **Never commit actual credentials to version control.**

### Required Environment Variables

Create a `.env` file in the `backend` directory with these variables:

```bash
# Copy the example file
cp backend/.env.example backend/.env
```

Then edit `backend/.env` with your actual values:

```env
# Database - Use your actual MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/becoming
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/becoming

# JWT Secret - Generate a strong random key
JWT_SECRET=your-actual-secret-key-here
```

### Generating Secure Keys

**JWT Secret**: Generate a cryptographically secure random key:
```bash
# Generate a 64-byte random hex string
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### MongoDB Security

**Local Development:**
- Use `mongodb://localhost:27017/becoming`
- Ensure MongoDB is running locally

**Production (MongoDB Atlas):**
1. Create a MongoDB Atlas account
2. Create a cluster and database user
3. Get your connection string from Atlas dashboard
4. Replace `<username>`, `<password>`, and `<cluster>` with actual values

### File Security

**Protected Files (never commit):**
- `backend/.env` - Contains actual secrets
- `backend/.env.local`
- `backend/.env.production`

**Safe Files (can commit):**
- `backend/.env.example` - Template with placeholder values
- `.gitignore` - Ensures sensitive files are excluded

### Production Deployment

**Environment Variables:**
- Set all required environment variables in your hosting platform
- Use your hosting provider's environment variable settings
- Never hardcode secrets in your application code

**Database Security:**
- Use MongoDB Atlas with IP whitelisting
- Create database users with minimal required permissions
- Enable MongoDB authentication
- Use SSL/TLS connections

### Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] Strong JWT secret (64+ characters)
- [ ] MongoDB connection uses authentication
- [ ] Environment variables set in production
- [ ] Regular security updates for dependencies

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainer directly rather than opening a public issue.
