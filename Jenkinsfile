pipeline {
  agent any
  stages {
    stage('Checkout the Code/Github') {
      steps {
        git(url: 'https://github.com/saashqdev/saashq', branch: 'main')
      }
    }

    stage('Node Check') {
      steps {
        nodejs('NodeJS-18') {
          sh 'npm -v'
        }

      }
    }

    stage('GITHUB 2 step ENV') {
      steps {
        git(url: 'https://github.com/saashqdev/saashq.git', branch: 'main', credentialsId: 'hqgithub')
      }
    }

    stage('copy ENV files') {
      steps {
        sh 'ls  -lah'
        sh '''sh \'cd saashq-configs/fairis\'
sh \'cp .env ../../\'
sh \'cp .env.local ../../\'
sh \'cd ../../\'
sh \'ls -lah\''''
      }
    }

  }
}
