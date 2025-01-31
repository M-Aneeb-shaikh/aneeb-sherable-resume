// Bind the submit event to the resume form
$("#resume-form").on("submit", function (event: JQuery.SubmitEvent) {
  event.preventDefault();

  // Serialize the form data and type it correctly as an array of name-value pairs
  const formData: Array<JQuery.NameValuePair> = $(this).serializeArray();

  // Clear the skills text before updating to prevent duplication
  $("#user-skills").text("");

  // Iterate through form data and populate corresponding elements
  formData.forEach((item: JQuery.NameValuePair) => {
    if (item.name === "skill") {
      // Concatenate skills as a comma-separated list
      const currentSkills = $("#user-skills").text();
      $("#user-skills").text(
        currentSkills ? `${currentSkills}, ${item.value}` : item.value
      );
    } else if (item.name === "gender") {
      // Update the user avatar based on gender
      const avatarUrl =
        item.value === "male"
          ? "https://avatar.iran.liara.run/public/boy"
          : "https://avatar.iran.liara.run/public/girl";
      $("#userAvatar").attr("src", avatarUrl);
    } else {
      // Populate elements directly by ID matching form field name
      $(`#${item.name}`).text(item.value);
    }
  });

  // Display the generated resume section
  $("#content-wrapper").hide();
  $("#generated-resume").show();
});

// Handle the print functionality with type safety
$("#print").click((): void => {
  window.print();
  $("#content-wrapper").show();
  $("#generated-resume").hide();
});
