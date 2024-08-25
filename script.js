document.addEventListener('DOMContentLoaded', () => {
    let modeToggle = document.getElementById('toggle-switch');
    let nav = document.getElementsByClassName("navbar")[0];

    modeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        toggleSignupSigninSections();
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('mode', 'dark');
        } else {
            localStorage.setItem('mode', 'light');
        }
    });

    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark-mode');
        modeToggle.checked = true;
        toggleSignupSigninSections();
    }

    let signup_btn = document.querySelector(".signup");
    signup_btn.addEventListener("click", signup_fun);

    function signup_fun() {
        let signup_container = document.createElement("div");
        signup_container.classList.add("signup_section");

        signup_container.innerHTML = `
            <div class="signup_panel">
                <form action="" method="post" class="signup_form">
                    <span class="del_btn"><button type="button" class="close_btn">X</button></span>
                    <span class="input_name rotate"><input type="text" name="name" class="name" placeholder="NAME" required></span>
                    <span class="input_email rotate"><input type="email" name="email" class="email" placeholder="EMAIL" required></span>
                    <span class="input_password rotate"><input type="password" name="password" class="password" placeholder="PASSWORD" required></span>
                    <span class="sign_btn rotate"><button type="submit" class="signup_btn">SIGN UP</button></span>
                    <span class="link_tab">
                        <button type="button" class="signup_link_btn">SIGN UP</button>  
                        <button type="button" class="signin_btn">SIGN IN</button>
                    </span>
                </form>
            </div>
        `;

        document.querySelector(".container").appendChild(signup_container);
        document.querySelector(".left").style.display = "none";
        document.querySelector(".right").style.display = "none";

        let closeBtn = signup_container.querySelector(".close_btn");
        closeBtn.addEventListener("click", () => {
            signup_container.remove();
            document.querySelector(".left").style.display = "block";
            document.querySelector(".right").style.display = "block";
        });

        let signupForm = signup_container.querySelector(".signup_form");
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let name = signupForm.querySelector(".name").value;
            let email = signupForm.querySelector(".email").value;
            let password = signupForm.querySelector(".password").value;

            if (name && email && password) {
                let userData = { name, email, password };
                localStorage.setItem("userData", JSON.stringify(userData));
                alert("Sign up successful!");
                signup_container.remove();
                document.querySelector(".left").style.display = "block";
                document.querySelector(".right").style.display = "block";
            } else {
                alert("Please fill in all fields.");
            }
        });

        let signinBtn = signup_container.querySelector(".signin_btn");
        signinBtn.addEventListener("click", () => {
            signup_container.remove();
            signin_fun();
        });
    }

    function signin_fun() {
        let signin_container = document.createElement("div");
        signin_container.classList.add("signin_section");

        signin_container.innerHTML = `
            <div class="signin_panel">
                <form action="" method="post" class="signin_form">
                    <span class="del_btn"><button type="button" class="close_btn">X</button></span>
                    <span class="input_email rotate"><input type="email" name="email" class="email" placeholder="EMAIL" required></span>
                    <span class="input_password rotate"><input type="password" name="password" class="password" placeholder="PASSWORD" required></span>
                    <span class="sign_btn"><button type="submit" class="signin_btn">SIGN IN</button></span>
                    <span class="link_tab">
                        <button type="button" class="signup_link_btn">SIGN UP</button>  
                        <button type="button" class="signin_link_btn">SIGN IN</button>
                    </span>
                </form>
            </div>
        `;

        document.querySelector(".container").appendChild(signin_container);

        let closeBtn = signin_container.querySelector(".close_btn");
        closeBtn.addEventListener("click", () => {
            signin_container.remove();
            document.querySelector(".left").style.display = "block";
            document.querySelector(".right").style.display = "block";
        });

        let signinForm = signin_container.querySelector(".signin_form");
        signinForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let email = signinForm.querySelector(".email").value;
            let password = signinForm.querySelector(".password").value;

            let storedData = JSON.parse(localStorage.getItem("userData"));

            if (storedData && storedData.email === email && storedData.password === password) {
                alert("Sign in successful!");
                signin_container.remove();
            } else {
                alert("Invalid email or password.");
            }
        });

        let signupLinkBtn = signin_container.querySelector(".signup_link_btn");
        signupLinkBtn.addEventListener("click", () => {
            signin_container.remove();
            signup_fun();
        });
    }

    function toggleSignupSigninSections() {
        document.querySelectorAll('.signup_section, .signin_section').forEach(section => {
            section.classList.toggle('dark-mode-bg');
        });
    }
});
