FROM denoland/deno:1.17.1
EXPOSE 8080
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
RUN deno cache main.ts
RUN mkdir -p /var/tmp/log
CMD ["run", "--allow-all", "main.ts"]