const CallToAction = () => {
    return (
        <footer>
        <div className="rounded-xl mt-16 bg-[#03B051] text-white text-center py-8 px-4">
        <h3 className="text-[32px] text-left font-medium mb-4">
          Know a tech event? Share it to help others find <br /> and join by adding yours to the list!
        </h3>
        <div className="flex justify-start space-x-4">
          <button className="px-4 py-2 bg-black text-white rounded-md ">
            Contribute
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-md ">
            Visit Site
          </button>
        </div>
      </div>

      <p className="text-center mb-4 mt-16">Made with luv from Hari and Justin 💚 FOSS United Chennai</p>
      </footer>
    );
}

export default CallToAction;