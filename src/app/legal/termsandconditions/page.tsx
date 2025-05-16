import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>

        <section>
          <h2 className="text-2xl font-semibold">
            1. Initial Terms Acceptance
          </h2>
          <p>
            Thank you for visiting QUA Nutrition (RYAN&lsquo;S RESEARCH LLP).
            Utilizing our mobile app, website, or any of our goods or services
            constitutes your acceptance of these terms and conditions. If you
            disagree with any of these terms, you may not use our website or
            services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. Definitions</h2>
          <p>
            <strong>Website:</strong> The Company’s online platform, located at{" "}
            <a
              href="https://www.ryanfernando.in"
              className="text-blue-600 underline"
            >
              www.ryanfernando.in
            </a>
            .<br />
            <strong>Services:</strong> Nutritional advice, product sales, and
            Mobile application provided by the Company.
            <br />
            <strong>User:</strong> Anyone accessing the website or Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            3. Nutritional Advice Services
          </h2>
          <p>
            Users who pay the necessary fees can receive nutrition advice
            services from the Company. Based on input and data from the user,
            RYAN&lsquo;S RESEARCH LLP offers nutrition consulting services. It
            is crucial to realize and accept that the nutrition counseling
            services we provide are not a replacement for professional medical
            care. We do not offer any type of medical diagnosis, recommendation,
            or care.
          </p>
          <p>
            It is your duty to let our nutritionists and counselors know if you
            have a pre-existing medical condition, are undergoing treatment
            right now, or are taking any prescription medication. This enables
            us to offer advice that is in line with your medical treatment
            strategy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4. Sales of Goods</h2>
          <p>
            The business offers nutrition and health-related goods for sale.
            Product prices, availability, and descriptions are subject to change
            without notice.
          </p>
          <p>
            Providing accurate shipping and payment information is the user’s
            responsibility. Sales of any item are final. Our Refund & Return
            Policy governs returns and refunds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">5. User Account</h2>
          <p>
            For access to some Services, users can register on our website/app.
            The security of your password and account information is your
            responsibility. You consent to promptly alert us of any unapproved
            access to or use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6. User Behaviour</h2>
          <p>
            While utilizing our Services, users must not engage in any illegal,
            dishonest, or destructive actions. Users are not permitted to
            compromise the security or functionality of the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">7. Intellectual Property</h2>
          <p>
            The Website’s text, images, logos, and other visuals are protected
            by copyright and other intellectual property laws. Without our
            express written consent, you may not use, copy, or distribute our
            content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">8. Liability Limitation</h2>
          <p>
            Any losses—direct, indirect, incidental, consequential, or
            otherwise—resulting from the use of our website or Services are not
            the responsibility of the Company. We provide no assurances on the
            accuracy or availability of our Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless RYAN&lsquo;S RESEARCH LLP,
            its affiliates, executives, employees, and agents from and against
            any liabilities, losses, damages, or costs (including legal
            expenses) arising from any third-party claims related to your
            content, your use of the Mobile Application, Products, Services, or
            any third-party information you provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">10. Termination</h2>
          <p>
            We retain the right to suspend or cancel your account and access to
            our Services at any time, with or without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            11. Adherence to These Conditions
          </h2>
          <p>
            You declare that you have read the Agreement and accept all of its
            provisions. By using the Website, Mobile Application, Products, or
            Services, you consent to be legally bound by this Agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">12. Communication</h2>
          <p>
            You agree to receive notifications from us regarding your purchases
            via email, phone calls, SMS, and WhatsApp. Users must register valid
            email addresses and phone numbers to enable such communication. We
            may also use your email address for updates, e-newsletters, and
            service feature changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">13. Contact Us</h2>
          <p>
            If you have any questions or complaints about our terms and
            conditions, kindly contact us.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
