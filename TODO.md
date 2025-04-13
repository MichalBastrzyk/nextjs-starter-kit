# TODO

## Tasks

- [ ] Feat: Add playwright tests
- [ ] Feat: Add vitest tests

- [ ] Feat: Implement email verification workflow

  - [ ] page saying that the email has been sent and a button to resend the email
  - [ ] email template for the verification email

  - [ ] Feat: Add a infinite scroll grid of images like the one that is in wordpress.
    - [ ] Implement images fetching from the S3 bucket using server actions and useSWR hook to fetch the images. (Server actions can be a bad choice here as they're sequential and not parallelizable, but it's the easiest way to do it for now.)
    - [ ] Feat: Add a modal for the image viewer.

- [ ] feat: Add user profile pictures
  - [ ] Add a profile picture column to the users table
  - [ ] Add a profile picture uploader
  - [ ] Add a profile picture cropper modal
  - [ ] Make sure that this also works with OAUTH users

## Done

- [x] Configure S3 bucket and add a docker-compose for mocking S3 locally
- [x] Fix: The bug where the nodemailer is being initialized on every request/nextjs page load.
- [x] Feat: Add permissions to user roles
- [x] Feat: Add a role selector to the user management page.
  - [x] User listing page
  - [x] User editing page
  - [x] User creation page
