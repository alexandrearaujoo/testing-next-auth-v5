import { auth, signOut } from '@/auth';

export default async function SettingsPage() {
  const session = await auth();

  return (
    <>
      <h1>{JSON.stringify(session)}</h1>
      <form
        onSubmit={async () => {
          'use server';

          await signOut();
        }}
      >
        <button type="submit">sign out</button>
      </form>
    </>
  );
}
