AIM: 

I should be able to open a repository containing FDX or Fountain files.
I should be able to access different branches of those repos.
I should be able to access the results of the `git diff` tool in the app.
If the file is either an FDX, or a Fountain file, I should be able to visualize the diff as formatted screenplay, rather than as a list of XML nodes ( FDX ), or raw markup ( Fountain. )


Components:
-Some way to go inside a repo.
-Some way to set a base branch and a target branch to diff them.
-Some way to run `git diff` in the repo.
-Some way to take the results of that diff, and represent it visually.
-Some tool to take Fountain markup diff output, and format it like an FDX file.
