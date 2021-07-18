export default function loginBar(props: { userData: any; layout: any }) {
  return (
    <div className={`${props.layout.layoutType === 'top' ? 'text-gray-900' : 'text-gray-900'}`}>
      <div className="px-2">{props.userData.realName}</div>
    </div>
  );
}
