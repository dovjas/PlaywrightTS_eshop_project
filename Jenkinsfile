pipeline {
    agent any

    environment {
        API_BASE_URL = 'https://automationexercise.com'
    }

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install chromium'
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