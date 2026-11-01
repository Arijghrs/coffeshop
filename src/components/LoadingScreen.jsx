export default function LoadingScreen({ hidden }) {
  return <div id="loader" className={hidden ? 'off' : ''}>Benyedder</div>;
}
