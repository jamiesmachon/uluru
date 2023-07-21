<p align="center">
  <a href="https://kubernetes.io/" target="blank"><img src="https://www.logo.wine/a/logo/Kubernetes/Kubernetes-Logo.wine.svg" width="300" alt="Kubernetes Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Installation the app/s

```bash
$ npm install -g typescript
$ npm install -g @nestjs/cli
$ npm install
```

## Running the app/s for development

```bash
$ docker-compose up
```

## Build your Kubernetes Cluster for local testing

Boot a Kubernetes cluster

```bash
$ kind create cluster --name uluru --image kindest/node:v1.26.3
```

### Test cluster is running

```bash
$ kubectl get nodes
NAME                  STATUS   ROLES           AGE   VERSION
uluru-control-plane   Ready    control-plane   47s   v1.26.3
```

## Deploying Ingress Manifest

[How to Deploy Nginx Ingress on Kubernetes](/kubernetes/ingress/controller/README.md)

## Deploying Services

Typically you would purchcace a domain and point it and/or any subdomains to the Kubernetes cloud Load Balancer IP where the Ingress would consume the traffic and route it to the appropriate service. For local purposes we will need to add some host file records.

### Add local domain to hosts file

```bash
$ sudo joe /etc/hosts
```

Add the following domains

```bash
127.0.0.1   rabbits.jamiesmachon.com
127.0.0.1   api.jamiesmachon.com
```

Now we have the required local setup we can deploy our nestjs monorepo applications to our Kind Kubernetes cluster

#### Deploying RabbitMQ

[How to Deploy RabbitMQ on Kubernetes](/kubernetes/rabbitmq/README.md)

#### Deploy our Applications

[How to Deploy NestJS App on Kubernetes](/kubernetes/helm/README.md)

## Routing

[How to Deploy Nginx Ingress Domain Routes on Kubernetes](/kubernetes/ingress/routes/README.md)

Now we can access our services on their assigned domains:

https://rabbits.jamiesmachon.com/
https://api.jamiesmachon.com/

## Logs

```bash
$ kubectl -n ingress-nginx logs -l app.kubernetes.io/instance=ingress-nginx
```

It's important to study the logs of the Ingress Controller to learn what path it saw, where it routed to

```bash
127.0.0.1 - - [13/Nov/2022:02:17:47 +0000] "GET /path-a/path.html HTTP/2.0" 404 19 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36" 485 0.000 [default-service-a-80] [] 10.244.0.8:80 19 0.000 404 206ed4b88b712564fc073c3adb845dff
```

In the above case, the controller saw /path-a/path.html , routed to service-a and we can see what our service-a saw, by looking at its logs:

```bash
$ kubectl logs -l app=service-a
10.244.0.7 - - [13/Nov/2022:02:28:36 +0000] "GET /path-a.html HTTP/1.1" 200 28 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
```

## SSL terminating & passthrough

As we noticed by logs, its default for the Ingress controller to offload SSL.
We can see this because when it routes to upstreams, it routes to our service on port 80
Ingress offloads the TLS connection and creates a new connection with its upstream.

This is a common approach to offload TLS on the edge as internal traffic is generally unencrypted in private networks especially in large microservice environments where security is tightened in other manners so TLS is not needed all the way through.

We can enable SSL pass through with the annotation: nginx.ingress.kubernetes.io/ssl-passthrough.

SSL Passthrough is disabled by default and requires starting the controller with the --enable-ssl-passthrough flag.

## IP Whitelist

We can add a layer of protection to our services that are exposed by an ingress.
One popular way is IP whitelisting.

This can be done with a whitelist source range annotation for example:

```bash
$ nginx.ingress.kubernetes.io/whitelist-source-range: <ip,ip,ip>
```

You can set this globally if you want using the Customization ConfigMap.
We'll take a look at this customization in a bit.

## Server snippet

Every ingress is technically an NGINX server block with a NGINX proxy pass.
We can even customise this server block with a Server Snippet annotation

## Customization

As mentioned before, the NGINX Ingress controller can be customized quite heavily with the ConfigMap

We can customize log format to JSON as well for example:

```bash
log-format-escape-json: "true"
  log-format-upstream: '{"time":"$time_iso8601","remote_addr":"$remote_addr","proxy_protocol_addr":"$proxy_protocol_addr","proxy_protocol_port":"$proxy_protocol_port","x_forward_for":"$proxy_add_x_forwarded_for","remote_user":"$remote_user","host":"$host","request_method":"$request_method","request_uri":"$request_uri","server_protocol":"$server_protocol","status":$status,"request_time":$request_time,"request_length":$request_length,"bytes_sent":$bytes_sent,"upstream_name":"$proxy_upstream_name","upstream_addr":"$upstream_addr","upstream_uri":"$uri","upstream_response_length":$upstream_response_length,"upstream_response_time":$upstream_response_time,"upstream_status":$upstream_status,"http_referrer":"$http_referer","http_user_agent":"$http_user_agent","http_cookie":"$http_cookie","http_device_id":"$http_x_device_id","http_customer_id":"$http_x_customer_id"}'
```

Apply the changes and restart Ingress:

```bash
$ kubectl apply -f ./kubernetes/ingress/manifests/nginx-ingress.1.7.0.yaml
$ kubectl -n ingress-nginx logs -l app.kubernetes.io/instance=ingress-nginx
```
