export default function ThanksResult(props: { msg: string }) {
  return (
    <div className="h-full w-full flex justify-center content-center">
      <div className="h-96 w-96 bg-white">{props.msg}</div>
    </div>
  );
}
