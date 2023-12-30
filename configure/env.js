<script>
  const storage = require("azure-storage"); const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=cosmosdb-newsletter;AccountKey=2zVJWI8UB4yF8Bvjlf8U0zugz6nUdebWc6zR3BIR9reIlRTIYnIhvtVIJW67KnynWUviQYdNOzOpACDbnBacRg==;TableEndpoint=https://cosmosdb-newsletter.table.cosmos.azure.com:443/;";
  const storageClient = storage.createTableService(connectionString);
</script>;
