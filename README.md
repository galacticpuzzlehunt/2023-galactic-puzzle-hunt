To update the app bundle, run the following command in `client/` (yes, we've been using the staging build target for prod the whole time):

```
npm run build-staging-django -- --base=/static/game
```

and replace the entire `static/game/assets` with `client/dist/assets/`.
