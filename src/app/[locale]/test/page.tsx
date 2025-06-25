export default async function TestPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <div>
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}
