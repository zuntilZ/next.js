export default () => (
  <div>
    <p>
      Loading data from { process.env.BACKEND_URL }
    </p>
    <p>
      Build-Version: { process.env.VERSION }
    </p>
  </div>
)
