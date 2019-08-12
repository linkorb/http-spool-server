workflow "hadolint action" {
  resolves = ["hadolint on push"]
  on = "push"
}

action "hadolint on pr" {
  uses = "burdzwastaken/hadolint-action@master"
  env = {
    HADOLINT_ACTION_DOCKERFILE_FOLDER = "."
  }
}

action "hadolint on push" {
  uses = "burdzwastaken/hadolint-action@master"
  env = {
    HADOLINT_ACTION_DOCKERFILE_FOLDER = "."
  }
}
