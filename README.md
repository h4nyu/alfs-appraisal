[![circleci](https://circleci.com/gh/h4nyu/alfs-appraisal.svg?style=svg)](https://app.circleci.com/pipelines/github/h4nyu/alfs-appraisal?filter=all)
[![codecov](https://codecov.io/gh/h4nyu/alfs-appraisal/branch/master/graph/badge.svg?token=9Q2C14ZRG5)](https://codecov.io/gh/h4nyu/alfs-appraisal)


`.env`

```sh
COMPOSE_FILE=docker-compose.yaml:docker-compose.local.yaml
```

| Packages                                   | Description  |
| :-                                         | :-           |
| **[@sivic/core](./app/packages/core)**     | domain       |
| **[@sivic/server](./app/packages/server)** | backend      |
| **[@sivic/web](./app/packages/web)**       | web frontend |
| **[@sivic/api](./app/packages/api)**       | client       |
