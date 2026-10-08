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
                bat 'npx playwright test'
            }
        }
    }
}