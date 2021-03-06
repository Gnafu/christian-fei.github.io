---
title: Run Cypress Integration Tests with GitHub Actions Workflow
date: 2019-08-31
layout: post.njk
tags:
  - post
  - javascript
  - nodejs
  - tutorial
  - featured
image: https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=40
---

On this very site this deployment strategy is used with GitHub actions:

```yml
      - name: uat
        run: |
          npm start &
          npx cypress run
```

As you can see, I just start the development server anad then run the `cypress` tests with `npx`.

You can also use the official Cypress GitHub Action, like this:


```yml
name: christianfei-devblog build
on: [push]
jobs:
  build_deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@master
        with:
          ref: refs/heads/master
      - name: install
        run: |
          npm install
      - name: build
        run: |
          npm run build
      - name: start server
        run: |
           npm start &
      - name: uat
        uses: cypress-io/github-action@v1
```

Easy as that. If you want to take a closer look at the workflow, check [this out](https://github.com/christian-fei/christian-fei.github.io/blob/master/.github/workflows/main.yml)

![ffmpeg-layer.png](/assets/images/posts/cypress-github-actions.png)
