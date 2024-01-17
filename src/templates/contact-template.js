import * as React from "react"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

const ContactPage = (contentfulPage) => {
  const [pending, setPending] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [userMessage, setUserMessage] = React.useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Save the user's message
    setUserMessage(event.target.message.value);
    // Show the custom modal
    setShowModal(true);
    // Clear the form or perform other actions as needed
    event.target.reset();
    setPending(false);
  };

  const closeModal = () => {
    // Close the custom modal
    setShowModal(false);
  };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   alert(
  //     "Email funkar inte än. Använd istället länken nedan för att skicka mig ett mejl:\n\n" +
  //       event.target.message.value
  //   );
  //   event.target.reset();
  //   setPending(false);
  // };

  return (
    <>
      <div className="gradient-background-1"></div>
      <div className="kontakt-container">
        {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
        <p className="contact-intro">Om du har frågor om de kurser jag förärvat och vill komma i kontakt med mig så finns det många sätt att kontakta mig på</p>
        <GatsbyImage className="kontakt-bild" image={getImage(contentfulPage.bilden.gatsbyImage)} alt={contentfulPage.titel} />
        <div className="kontakt">
          <p className="contact-paragrah">Hitta mig på sociala medier, ladda ner mitt CV eller kontakta mig genom detta formulär</p>
          <div className="cta-knappar">
          <a
            href="/Axel_O_CV.pdf"
            download={true}
            className="group bg-white px-7 py-4 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-black/10 dark:bg-white/10"
          >
            <span className="link-span">Ladda ner CV</span>
            <HiDownload className="opacity-70 group-hover:translate-y-0.5 transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/axel-olivecrona-077b17b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-700 hover:text-gray-950 p-4 flex items-center gap-2 rounded-full cursor-pointer border border-black/10 focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition dark:bg-white/10 dark:text-white/60"
          >
            <span className="link-span">LinkedIn</span>
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/axxcident"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-700 hover:text-gray-950 text-[1.35rem] p-4 flex items-center gap-2 rounded-full cursor-pointer border border-black/10 focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition dark:bg-white/10 dark:text-white/60"
          >
            <span className="link-span">Github</span>
            <FaGithubSquare />
          </a>
          </div>
          <div className="email-container">
            <form
              name="contact"
              className="contact-form"
              onSubmit={handleFormSubmit}
              >
              <input
                className="form-input"
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="Email"
              />
              <textarea
                className="textarea-input"
                name="message"
                placeholder="Subject"
                required
                maxLength={500}
              />
              <div className="form-bottom">
                <button
                  type="submit"
                  className="kontakt-btn"
                  disabled={pending}
                  >
                  {pending ? (
                    <div className=""></div>
                  ) : (
                    <>
                      Send{" "}
                      <FaPaperPlane className="" />{" "}
                    </>
                  )}
                </button>
                <p className="email-text">
                  Please contact me directly at{" "}
                  <a className="email-anchor" href="mailto:olivecrona.axel@gmail.com">olivecrona.axel@gmail.com</a>
                  {" "}or through this form.
                </p>
              </div>
            </form>
            {showModal && (
              <div className="custom-modal">
                <div className="modal-content">
                  <p>
                    Email funkar inte än. Kopiera ditt meddelande och använd istället länken nedan för att skicka mig ett mejl:
                  </p>
                  <textarea
                    readOnly
                    value={userMessage}
                    onClick={(e) => e.target.select()}
                  />
                  <button onClick={closeModal}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="gradient-background-3"></div>
    </>
  );
}

export default ContactPage;
