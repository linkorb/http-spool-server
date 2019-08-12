workflow "hadolint action" {
  on = "pull_request"
  resolves = ["hadolint on pr"]
}

action "hadolint on pr" {
  uses = "burdzwastaken/hadolint-action@master"
  env = {
    HADOLINT_ACTION_DOCKERFILE_FOLDER = "."
  }
}
