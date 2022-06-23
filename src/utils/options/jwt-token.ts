export const jwtTokenOpt = {
    secret: process.env.PRIVATE_KEY_JWT_TOKEN || 'SECRET_JWT_TOKEN',
    signOptions: {
        expiresIn: '24h'
    }

}