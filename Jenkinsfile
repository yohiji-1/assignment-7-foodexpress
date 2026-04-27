pipeline {
    agent any

    environment {
        IMAGE_NAME = "foodexpress-app"
        CONTAINER_NAME = "foodexpress-container"
        EC2_USER = "ubuntu"
        EC2_HOST = "3.94.118.121"
        SSH_KEY = "C:\\Users\\Admin\\.ssh\\foodexpress-key"
    }

    stages {
        stage('Pull Code from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/yohiji-1/assignment-7-foodexpress.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Save Docker Image') {
            steps {
                bat 'docker save %IMAGE_NAME% -o foodexpress-app.tar'
            }
        }

        stage('Copy Image to EC2') {
            steps {
                bat 'scp -i "%SSH_KEY%" -o StrictHostKeyChecking=no foodexpress-app.tar %EC2_USER%@%EC2_HOST%:/home/ubuntu/'
            }
        }

        stage('Deploy Container on EC2') {
            steps {
                bat '''
                ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "docker load -i /home/ubuntu/foodexpress-app.tar && docker stop foodexpress-container || true && docker rm foodexpress-container || true && docker run -d -p 3000:3000 --name foodexpress-container foodexpress-app"
                '''
            }
        }
    }
}