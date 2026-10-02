
// Student Number Validation
function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

// Password Validation
function isValidPassword(value) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[^\s]{8,}$/.test(value);
}

// Export functions for Node.js testing
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

// Run form events only in the browser
if (typeof document !== "undefined") {
    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");
    const passwordFeedback = document.getElementById("passwordFeedback");

    // Display an error message
    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        input.setAttribute("aria-invalid", "true");
        return message === "";
    }

    // Clear an error message
    function clearError(input, errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = "";
        input.setAttribute("aria-invalid", "false");
    }

    // Validate Full Name
    function validateFullName() {
        const value = fullName.value.trim();

        if (value.length < 2) {
            return showError(
                fullName,
                "fullNameError",
                "Please enter at least 2 characters for your name."
            );
        }

        clearError(fullName, "fullNameError");
        return true;
    }

    // Validate Student Number
    function validateStudentNumber() {
        const value = studentNumber.value.trim();

        if (value === "") {
            return showError(
                studentNumber,
                "studentNumberError",
                "Student number is required."
            );
        }

        if (!isValidStudentNumber(value)) {
            return showError(
                studentNumber,
                "studentNumberError",
                "Enter a student number in the format 24-1234-123."
            );
        }

        clearError(studentNumber, "studentNumberError");
        return true;
    }

    // Validate Email
    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

        if (value === "") {
            return showError(
                email,
                "emailError",
                "Email address is required."
            );
        }

        if (!emailPattern.test(value)) {
            return showError(
                email,
                "emailError",
                "Enter a valid email address."
            );
        }

        clearError(email, "emailError");
        return true;
    }

    // Validate Mobile Number
    function validateMobileNumber() {
        const value = mobileNumber.value.trim();
        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (value === "") {
            return showError(
                mobileNumber,
                "mobileError",
                "Mobile number is required."
            );
        }

        if (!mobilePattern.test(value)) {
            return showError(
                mobileNumber,
                "mobileError",
                "Use 09XXXXXXXXX or +639XXXXXXXXX."
            );
        }

        clearError(mobileNumber, "mobileError");
        return true;
    }

    // Validate Password
    function validatePassword() {
        const value = password.value;

        if (value === "") {
            return showError(
                password,
                "passwordError",
                "Password is required."
            );
        }

        if (!isValidPassword(value)) {
            return showError(
                password,
                "passwordError",
                "Use 8+ characters, an uppercase letter, a number, and @, $, or !. No spaces."
            );
        }

        clearError(password, "passwordError");
        return true;
    }

    // Validate Confirm Password
    function validateConfirmPassword() {
        const value = confirmPassword.value;

        if (value === "") {
            return showError(
                confirmPassword,
                "confirmPasswordError",
                "Please confirm your password."
            );
        }

        if (value !== password.value) {
            return showError(
                confirmPassword,
                "confirmPasswordError",
                "Passwords do not match."
            );
        }

        clearError(confirmPassword, "confirmPasswordError");
        return true;
    }

    // Validate Course
    function validateCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            return showError(
                course,
                "courseError",
                "Please select your course."
            );
        }

        clearError(course, "courseError");
        return true;
    }

    // Validate Terms
    function validateTerms() {
        if (!terms.checked) {
            return showError(
                terms,
                "termsError",
                "You must agree to the terms and conditions."
            );
        }

        clearError(terms, "termsError");
        return true;
    }

    // Show live password feedback
    password.addEventListener("input", function () {
        const value = password.value;

        if (value === "") {
            passwordFeedback.textContent = "";
        } else if (isValidPassword(value)) {
            passwordFeedback.textContent =
                "Password meets all requirements.";
            passwordFeedback.style.color = "#15803d";
        } else {
            passwordFeedback.textContent =
                "Password must have 8+ characters, an uppercase letter, a number, and @, $, or !. No spaces.";
            passwordFeedback.style.color = "#dc2626";
        }

        if (password.getAttribute("aria-invalid") === "true") {
            validatePassword();
        }

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });

    // Validate full name when leaving the field
    fullName.addEventListener("blur", validateFullName);

    // Course change event
    course.addEventListener("change", validateCourse);

    // Terms change event
    terms.addEventListener("change", validateTerms);

    // Recheck fields when their values change
    studentNumber.addEventListener("input", function () {
        if (studentNumber.getAttribute("aria-invalid") === "true") {
            validateStudentNumber();
        }
    });

    email.addEventListener("input", function () {
        if (email.getAttribute("aria-invalid") === "true") {
            validateEmail();
        }
    });

    mobileNumber.addEventListener("input", function () {
        if (mobileNumber.getAttribute("aria-invalid") === "true") {
            validateMobileNumber();
        }
    });

    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.getAttribute("aria-invalid") === "true") {
            validateConfirmPassword();
        }
    });

    // Form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const isValid = [
            validateFullName(),
            validateStudentNumber(),
            validateEmail(),
            validateMobileNumber(),
            validatePassword(),
            validateConfirmPassword(),
            validateCourse(),
            validateTerms()
        ].every(Boolean);

        if (!isValid) {
            successMessage.textContent = "";
            registrationSummary.hidden = true;
            return;
        }

        // Display registration details safely
        document.getElementById("summaryName").textContent =
            fullName.value.trim();

        document.getElementById("summaryStudentNumber").textContent =
            studentNumber.value.trim();

        document.getElementById("summaryEmail").textContent =
            email.value.trim();

        document.getElementById("summaryMobileNumber").textContent =
            mobileNumber.value.trim();

        document.getElementById("summaryCourse").textContent =
            course.value;

        successMessage.textContent =
            "Registration details validated successfully!";

        registrationSummary.hidden = false;
    });

    // Reset form and clear all feedback
    form.addEventListener("reset", function () {
        const errorFields = [
            [fullName, "fullNameError"],
            [studentNumber, "studentNumberError"],
            [email, "emailError"],
            [mobileNumber, "mobileError"],
            [password, "passwordError"],
            [confirmPassword, "confirmPasswordError"],
            [course, "courseError"],
            [terms, "termsError"]
        ];

        errorFields.forEach(function (field) {
            clearError(field[0], field[1]);
        });

        passwordFeedback.textContent = "";
        successMessage.textContent = "";
        registrationSummary.hidden = true;

        [
            "summaryName",
            "summaryStudentNumber",
            "summaryEmail",
            "summaryMobileNumber",
            "summaryCourse"
        ].forEach(function (id) {
            document.getElementById(id).textContent = "";
        });
    });
}