TODO:

1. user should be able to sign into their github account via OAuth
2. user should be able to look at their repos
3. user should be able to select a repo
4. a user should be able to, within a selected repo, set 2x branches to compare
5. the user should see a diff of the changes between those branches

REQUIREMENTS:
1. Auth functionality
2. Pull the diff down from the GitHub API
3. If it's FDX, then strip out the relevant <Content> tags
4. Convert that <Content> to Fountain markdown
5. Render Fountain as HTML in the browser
