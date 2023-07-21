## Routing by Domain

The most common way to route traffic with ingress is by domain:

https://rabbits.jamiesmachon.com/ --> Ingress --> k8s service --> http://rabbitmq/
https://api.jamiesmachon.com/ --> Ingress --> k8s service --> http://api-gateway/
To showcase this, let's deploy an ingress for our services that routes by domain.

```bash
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: rabbitmq-ingress
  namespace: rabbits
spec:
  ingressClassName: nginx
  rules:
    - host: rabbits.jamiesmachon.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: rabbitmq-service
                port:
                  name: http
```

### Deploy our Ingress Routes

```bash
$ kubectl -n rabbits apply -f ./kubernetes/ingress/routes/rabbitmq.route.yaml
$ kubectl -n gateway apply -f ./kubernetes/ingress/routes/api-gateway.route.yaml
$ kubectl -n microservices apply -f ./kubernetes/ingress/routes/auth-microservice.route.yaml
```
