pipeline {
    agent any

    options {
        buildDiscarder(logRotator(
            numToKeepStr: '30',
            artifactNumToKeepStr: '15'
        ))
    }


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
     post {
        always {
             // Generate and publish the Allure report
            allure([
                results: [[path: 'allure-results']]
            ])
            publishHTML(target: [
                reportName: 'Playwright HTML Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])

                // Archive test diagnostics and raw Allure results
            archiveArtifacts(
                artifacts: 'test-results/**/*,allure-results/**/*',
                allowEmptyArchive: true
            )
        }
    }
}