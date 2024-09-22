import Icon from "./Icon"

const Hero = () => {
  return (
      <>
          <div className="main py-10">
              <div className="layout text-center">
                  <div>
                      <h1 className="md:text-4xl text-3xl font-sora font-bold">Stay Organized. Track Projects. Achieve More.</h1>
                      <p className="opacity-[.8] text-sm md:text-base">Organiza helps you create, manage, and track all your projects in one place. Stay on top of tasks and collaborate effortlessly with your team.</p>
                  </div>
                  <div className="flex-center mt-6">
                      <button className="btn-primary h-12 px-8 rounded-xl">
                          <span>Start Organizing</span>
                          <Icon>arrow_forward</Icon>
                      </button>
                  </div>
              </div>
      </div>
      </>
  )
}

export default Hero