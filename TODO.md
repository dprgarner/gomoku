# TODO list

## Bugs

- If I leave my browser open for an hour and then play a move, the token will be invalid. The backend doesn't return credential-errors to the frontend.
- If it keeps crashing in Docker, try `node --max-old-space-size=8192 node_modules/.bin/parcel ...`
- No error recovery on the lobby page.

## Auth flow improvements

- I forgot my password
- I want to change my password
- I want to upgrade from anon to email-logged-in user
- I want to delete everything about myself on the app
- I want to change my display name

## UI improvements

- Big componentDidCatch modal around everything?
- Cache users. It looks a bit daft, being fetched each time.
- Distinguish between "No user joined" versus "Anon user joined"
- Update match page when another user joins (somehow)
- More emphasis on last-played stone. Animation when being played, like a slight zoom? Or perhaps an outline?
- Highlight winning five-in-a-row

### Additional game options

- No overshooting (6-in-a-row does not win)
- Nerf Black (cannot move next to first stone)
