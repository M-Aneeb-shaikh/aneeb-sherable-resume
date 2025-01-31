$(document).ready(() => {
    const form = $('#resume-form');
    const generatedResume = $('#generated-resume');
    const resumeDisplay = $('#resume-display');
    const urlContainer = $("#url");

    // Handle form submission
    form.on('submit', function (event) {
        event.preventDefault(); // Prevent page reload
        const formData = getFormData();
        const encodedURL = generateSharableLink(formData);
        const origin = location.origin;
        
        // Display the generated link
        $("#url").attr("src", encodedURL).text("Go to URL").toggleClass("btn-disabled");
        window.location.search = encodedURL;        
    });
    

    // Populate data from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
        const data = decodeParams(urlParams);
        populateResume(data);
    }

    // Print functionality
    $('#print').on('click', () => {
        window.print();
    });
});

// Extract form data into an object
function getFormData() {
    const formData = {};
    
    $('#resume-form').serializeArray().forEach((input) => {
        if (input.name === 'skill') {
            formData[input.name] = formData[input.name] || [];
            formData[input.name].push(input.value); // Capture multiple skills
        } else {
            formData[input.name] = input.value;
        }
    });
    
    return formData;
}

// Generate a shareable link with encoded URL parameters
function generateSharableLink(data) {
    const params = new URLSearchParams(data);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

// Decode URL parameters into an object
function decodeParams(params) {
    const data = {};

    params.forEach((value, key) => {
        if (key === 'skill') {
            data[key] = data[key] || [];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    return data;
}

// Populate the resume template with data
function populateResume(data) {
  // Update the user avatar based on gender
  var avatarUrl =
    data.gender === "male"
      ? "https://avatar.iran.liara.run/public/boy"
      : "https://avatar.iran.liara.run/public/girl";
  $("#userAvatar").attr("src", avatarUrl);

  $("#name").text(data.name || "");
  $("#title").text(data.title || "");
  $("#phone").text(data.phone || "");
  $("#email").text(data.email || "");
  $("#about").text(data.about || "");
  $("#jobTitle").text(data.jobTitle || "");
  $("#jobInstitute").text(data.jobInstitute || "");
  $("#jobStart").text(data.jobStart || "");
  $("#jobEnd").text(data.jobEnd || "");
  $("#degreeTitle").text(data.degreeTitle || "");
  $("#degreeInstitute").text(data.degreeInstitute || "");
  $("#degreeStart").text(data.degreeStart || "");
  $("#degreeEnd").text(data.degreeEnd || "");

  // Skills display
  if (Array.isArray(data.skill)) {
    $("#user-skills").text(data.skill.join(", "));
  } else {
    $("#user-skills").text(data.skill || "");
  }

  // Show the generated resume and hide the form
  $("#generated-resume").removeClass("hidden");
  $("#content-wrapper").addClass("hidden");
}
