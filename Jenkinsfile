pipeline {
   agent {
        node {
            label 'docker-agent'
        }
   }
   stages{
        stage('Code Checkout') { 
            steps{
                    git 'https://github.com/sushanthmangalore/insurance-shop.git'
            }
        }
        stage('Install dependencies') { 
            steps{
                    sh 'npm install'
            }
        }
        stage('Code Quality') {
            steps{
                sh 'npm run eslint'
            }
        }
        stage('Tests') {
             steps{
               sh 'npm t'
            }
        }
        stage('Undeploy') {
             steps{
                    sh '''docker ps -q --filter ancestor=sushanthmangalore/shopapp
                    container=$(docker ps -q --filter ancestor=sushanthmangalore/shopapp)
                    if [ -n "$container" ]; then
                        docker stop $container
                        docker rm -f $container
                    fi'''
                    withDockerRegistry([url:'',credentialsId: '2036d5b1-dcfe-4c89-a54f-f8dd46002fbb']) {
                        sh '''image=$(docker images --filter=reference="sushanthmangalore/shopapp" --format "{{.ID}}")
                              if [ -n "$image" ]; then
                                docker tag $image sushanthmangalore/shopapp:previous
                                docker push sushanthmangalore/shopapp
                                docker rmi -f $image
                              fi'''
                    }
            }
        }
        stage('Deploy') {
             steps{
               sh 'docker build -t sushanthmangalore/shopapp .'
               sh 'docker run -d -p 9080:9080 sushanthmangalore/shopapp'
            }
        }
        stage('Smoke Test') {
             steps{
                 sh '''	echo "Success" > file1
                        status=$(curl -sI \'http://ec2-52-66-194-198.ap-south-1.compute.amazonaws.com:9080/\' | head -n 1 | awk \'{print $2}\')
                        echo $status
                        if [ $status -ne 200 ]; then
                            echo "Failure" > file1
                            docker ps -q --filter ancestor=sushanthmangalore/shopapp
                            container=$(docker ps -q --filter ancestor=sushanthmangalore/shopapp)
                            if [ -n "$container" ]; then
                                docker stop $container
                                docker rm -f $container
                            fi
                            image=$(docker images --filter=reference="sushanthmangalore/shopapp" --format "{{.ID}}")
                            if [ -n "$image" ]; then
                                docker rmi -f $image
                            fi
                            docker pull sushanthmangalore/shopapp:previous
                            docker run -d -p 9080:9080 sushanthmangalore/shopapp
                        fi'''
                        script {
                            jobStatus = readFile('file1');
                            jobStatus = jobStatus.trim();
                        }
            }
        }
        stage('Notify') {
            steps{
                    script {
                        if(jobStatus=='Failure'){
                            mail bcc: '', body: 'The deployment was not successful. The old version of the app has been restored.', cc: '', from: '', replyTo: '', subject: 'Deployment Status', to: 'sushanth.rao@gmail.com'
                        }else{
                            mail bcc: '', body: 'The deployment was completed successfully. The new version of the app can be accessed at the URL - http://ec2-52-66-194-198.ap-south-1.compute.amazonaws.com:9080/', cc: '', from: '', replyTo: '', subject: 'Deployment Status', to: 'sushanth.rao@gmail.com'
                        }
                    }
            }
        }
   }
}