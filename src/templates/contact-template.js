import * as React from "react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

const ContactPage = (contentfulPage) => {

  const [pending ] = React.useState(false);
  // const [pending, setPending] = React.useState(false);

  return (
    <>
      {/* <h3>{contentfulPage.titel}</h3> */}
      <div className="gradient-background-1"></div>
      <div className="kontakt-container">
        {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
        <div className="kontakt">
          <a
            href="/Axel_O_CV.pdf"
            download={true}
            className="group bg-white px-7 py-4 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-black/10 dark:bg-white/10"
          >
            Ladda ner CV
            <HiDownload className="opacity-70 group-hover:translate-y-0.5 transition" />
          </a>

          <a
            href="https://www.linkedin.com/in/axel-olivecrona-077b17b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-700 hover:text-gray-950 p-4 flex items-center gap-2 rounded-full cursor-pointer border border-black/10 focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition dark:bg-white/10 dark:text-white/60"
          >
            <BsLinkedin />
          </a>

          <a
            href="https://github.com/axxcident"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-700 hover:text-gray-950 text-[1.35rem] p-4 flex items-center gap-2 rounded-full cursor-pointer border border-black/10 focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition dark:bg-white/10 dark:text-white/60"
          >
            <FaGithubSquare />
          </a>
        </div>
        <div className="email-container">
          <h4>eller kontakta mig genom detta formulär</h4>
          <p className="">
            Please contact me directly at{" "}
            <a className="" href="mailto:olivecrona.axel@gmail.com">olivecrona.axel@gmail.com</a>
            {" "}or through this form.
          </p>
          <form
            name="contact"
            // method="POST"
            // data-netlify="true"
            className="contact-form">
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
          </form>
        </div>
      </div>
      <div className="gradient-background-3"></div>
    </>
  );
}

export default ContactPage;
