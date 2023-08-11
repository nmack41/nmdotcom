<script>
const storage = require("azure-storage");
const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=cosmosdb-newsletter;AccountKey=2zVJWI8UB4yF8Bvjlf8U0zugz6nUdebWc6zR3BIR9reIlRTIYnIhvtVIJW67KnynWUviQYdNOzOpACDbnBacRg==;TableEndpoint=https://cosmosdb-newsletter.table.cosmos.azure.com:443/;";
const storageClient = storage.createTableService(connectionString);
</script>

<template>
  <div class="p-4">
    I will send a monthly (maybe bi-monthly) newsletter regarding health,
    fitness, and performance. This will include questions I've been asked about,
    new research, and thoughts on current trends. Sign-up below!
    <SignUpForm />
  </div>
</template>
