<template>
  <div class="relative max-w-xs overflow-hidden bg-cover bg-[50%] bg-no-repeat">
    <img
      class="w-full max-w-md h-auto"
      src="assets/mulyadi-ZnLprInKM7s-unsplash_sad.jpg"
      alt="error-pic"
    />
    <div
      class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
      style="background-color: hsla(0, 0%, 0%, 0.6)"
    >
      <div class="flex h-full items-center justify-center">
        <p class="text-white opacity-100">Can you see me?</p>
      </div>
    </div>
  </div>
  // look above
  <div class="flex justify-center">
    <div class="text-center">
      <img
        class="w-full max-w-md h-auto"
        src="assets/mulyadi-ZnLprInKM7s-unsplash_sad.jpg"
        alt="profile-pic"
      />
      <div class="text-center font-thin">
        Photo by
        <a
          href="https://unsplash.com/@mullyadii?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >Mulyadi</a
        >
        on
        <a
          href="https://unsplash.com/photos/ZnLprInKM7s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >Unsplash</a
        >
      </div>
    </div>
  </div>
  <NuxtLayout> </NuxtLayout>
</template>
