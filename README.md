# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey adunne8! 

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/adunne8/skills-build-applications-w-copilot-agent-mode/issues/1)

## Octofit Frontend API Environment Variable

For the React presentation tier, define VITE_CODESPACE_NAME so the app can call the backend in Codespaces.

Example in .env.local:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend uses this pattern:

- https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

If VITE_CODESPACE_NAME is not set, the app safely falls back to:

- http://localhost:8000/api/[component]/

