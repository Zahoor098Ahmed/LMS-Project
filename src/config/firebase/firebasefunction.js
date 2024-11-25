const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password); // Debugging
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Dummy logic for role-based navigation
      if (user.email === "admin@example.com") {
        navigate("/admin");
      } else if (user.email === "teacher@example.com") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Login failed:", error.message); // Show Firebase error message
    }
  };
  