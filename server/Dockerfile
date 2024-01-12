FROM node
EXPOSE 8000
WORKDIR /opt
COPY --chmod=733 docker-runner.bash .
CMD [ "./docker-runner.bash", "server" ]
