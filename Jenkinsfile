pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run tests') {
            steps {
                withCredentials([
                    string(credentialsId: 'TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'TEST_USER_PASSWORD', variable: 'TEST_USER_PASSWORD')
                ]) {
                    bat 'npx playwright test'
                }
            }
        }
    }
}