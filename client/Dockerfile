FROM node
EXPOSE 4173
WORKDIR /opt
COPY --chmod=733 docker-runner.bash .
CMD [ "./docker-runner.bash", "client" ]
