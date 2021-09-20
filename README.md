# Rocket Academy
# Jekyll Netlify Boilerplate

### Setup authentication
After deploying this project, Netlify Identity will add you as a CMS user and
will email you an invite. It is not necessary to accept this invite if you wish
to use an
[OAuth provider](https://www.netlify.com/docs/identity/#external-provider-login)
(e.g. Github) to manage authentication for your CMS.
It is recommended to use this method of authentication as it removes the need
for an email & password to log in to the CMS and is generally more secure. You
will need to add an OAuth provider in your Netlify app settings under
"Settings" > "Identity" > "External providers".

Next, navigate to `/admin` on your site, choose your OAuth provider from the
login box and you should then be logged into your CMS.

Now you're all set, and you can start editing content!

**Note:** if you switch the repo that was created to private, you'll need to regenerate your token,
as the token generated using the deploy to Netlify button can only access public repositories. To
regenerate your token, head to "Settings" in your Netlify site dashboard, go to the "Identity"
section, then scroll to "Services" where you'll see an "Edit settings" button. Click that and you'll
see a text link to "Generate access token in GitHub".

## Netlify CLI
Globally install the netlify CLI.
[Netlify CLI](https://docs.netlify.com/cli/get-started/)

When cloning the project, connect the repo to netlify:
```bash
netlify init
```

## Local Development

Clone this repository and run:
```bash
bundle install
npm install
netlify dev
```

## Bootstrap

Bootstrap was added simply by `git clone`ing the GitHub repo into the `_sass/bootstrap` directory and deleting the `.git` repo directory.

This is so that the sass files have access to all Bootstrap SASS variables and mixins.

See the docs here: https://getbootstrap.com/docs/5.0/customize/sass/

Media queries: https://getbootstrap.com/docs/5.0/layout/breakpoints/#min-width

Variables: https://bootstrap-cheatsheet.themeselection.com/variables.html

Mixins: https://bootstrap-cheatsheet.themeselection.com/mixins.html

## Mailchimp
Look for the "list id" here: https://mailchimp.com/help/find-audience-id/ (it's called audience id elsewhere)
