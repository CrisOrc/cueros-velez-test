export default function ErrorMessage({ message }: { message: string }) {
  return <p role="alert">❌ {message}</p>;
}
