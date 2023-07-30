<template>
  <div class="newsletter-form"></div>
  <FormKit
    type="form"
    submit-label="Submit"
    action=""
    method="post"
    form-class="form-padding "
    message="{
      success: 'Thank you for subscribing!',
      error: 'There was an error subscribing. Please try again.'
    }"
  >
    <FormKit
      name="email"
      label="Email Address"
      validation="required|email"
      :validation-messages="{
        matches: 'Must be a valid email address',
      }"
      input-class="input-border border border-gray-700"
      :floating-label="true"
      v-model="emailaddress"
    />
  </FormKit>
</template>

<script>
export default {
  data() {
    return {
      emailaddress: "",
    };
  },
};
// POST email
async function create() {
  const data = {
    id: "2",
    emailaddress: emailaddress,
  };

  const gql = `
  mutation create($item: emailInput!) {
    createemail(item: $item) {
      id
      emailadress
    }
  }`;

  const query = {
    query: gql,
    variables: {
      item: data,
    },
  };

  const endpoint = "/data-api/graphql";
  const result = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });

  const response = await result.json();
  console.table(response.data.createemail);
}
</script>

<style>
.form-padding {
  padding: 10px;
}
</style>
