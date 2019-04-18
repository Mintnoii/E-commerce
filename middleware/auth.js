
export default function ({ store, redirect }) {
  console.log
  if (!store.state.user) {
    return redirect('/login')
  }
}

