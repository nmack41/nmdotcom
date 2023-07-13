<template>
  <div class="about-me">
    <h1>Nick Mackowski</h1>
    <div class="about-me-wrapper">
      <div class="about-me-profile">
        <img
          id="profile1"
          src="/src/assets/Nick_circle_2.png"
          alt="profile-pic"
        />
      </div>
      <div class="about-me-skillcerts">
        <div class="skills">
          <h2>Technical Skills</h2>
          <div class="techskills">
            <div v-for="(skill, index) in skills" :key="index">
              <p>{{ skill }}</p>
            </div>
          </div>
        </div>
        <div class="certifications">
          <h2>Certifications</h2>
          <div v-for="(cert, index) in certs" :key="index">
            <p>{{ cert }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="publications">
      <h2>Publications</h2>
      <div v-for="(publish, index) in pub" :key="index">
        <p>{{ publish }}</p>
      </div>
    </div>
    <div class="abstracts">
      <h2>Abstracts</h2>
      <div v-for="(abs, index) in abstract" :key="index">
        <p>{{ abs }}</p>
      </div>
    </div>
    <div class="experiences">
      <h2>Experiences</h2>
      <div v-for="(experience, index) in exp" :key="index">
        <p class="exptitle">{{ experience.exptitle }}</p>
        <p>{{ experience.expdesc }}</p>
      </div>
    </div>
    <div class="education">
      <h2>Education</h2>
      <div v-for="(edu, index) in school" :key="index">
        <p>{{ edu }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        "SQL",
        "Python",
        "R",
        "Tableau",
        "Microsoft Excel",
        "Smartabase",
        "Proficient in a variety of performance technologies (e.g. force plates, velocity-based training devices, AMS)",
      ],
      certs: [
        "CompTIA Security+",
        "Certified Strength and Conditioning Speciapst (CSCS) – National Strength & Conditioning Association (NSCA)",
        "First Aid – American Red Cross",
        "CPR & AED – American Red Cross",
      ],
      pub: [
        "Merrigan, J., Stute, N., Eckerle, J.,Mackowski, N., Walters, J., O’Connor, M., Barrett, K., Robert, R., Strang, A. and Hagen, J., 2022. Reliability and Validity of Contemporary Bioelectrical Impedance Analysis Devices for Body Composition Assessment. Journal of Exercise and Nutrition, 5(4).",
        "Hierholzer K., Briggs R., Tolston M., Mackowski N., Eckerle J., O’Connor M., Barrett K., Smith R., Strang A., Heart Rate Variability: A Longitudinal Comparison of Commercial Devices for Individual and Group Stress-Response, Advances in Applied Physiology. Volume 7, Issue 2, December 2022, pp. 26-33. doi: 10.11648/j.aap.20220702.12",
        "Stute NL, Szeghy RE, Mackowski NS. All is fair in menstruation, POTS and… war? J Physiol. 2022 Aug 1. doi: 10.1113/JP283297. Epub ahead of print. PMID: 35913261.",
        "Hierholzer, K., Briggs, R., Tolston, M., Mackowski, N., O’Connor, M., Barrett, K., Smith, R., Eckerle, J. and Strang, A., 2022. Heart Rate Variability Metrics from Commercial Devices Predicts Strength and Cardiovascular Performance in a Military Cohort. American Journal of Sports Science, 10(1), pp.14-23.",
        "Strang, A.J., Smith, R., Hierholzer, K., Moore, B., Crews, R. and Mackowski, N., 2021. Effects of an AMINO-ACID Gel (AQUAGARD (registered trademark)) on Hydration and Performance Parameters During Prolonged Aerobic Exercise. Oak Ridge Institute for Science and Education.",
        "Devine, K.A., Viola, A., Levonyan‐Radloff, K., Mackowski, N., Bozzini, B., Chandler, A., Xu, B., Ohman‐Strickland, P., Mayans, S., Farrar‐Anton, A. and Sahler, O.J.Z., 2020. Feasibility of FitSurvivor: A technology‐enhanced group‐based fitness intervention for adolescent and young adult survivors of childhood cancer. Pediatric Blood & Cancer, 67(9), p.e28530.",
        " Harshman, S.W., Strayer, K.E., Davidson, C.N., Pitsch, R.L., Narayanan, L., Scott, A.M., Schaeublin, N.M., Wiens, T.L., Phelps, M.S., O’Connor, M.L. and Mackowski, N.S., 2021. Rate normalization for sweat metabolomics biomarker discovery. Talanta, 223, p.121797.",
        "Harshman, S.W., Browder, A.B., Davidson, C.N., Pitsch, R.L., Strayer, K.E., Schaeublin, N.M., Phelps, M.S., O’Connor, M.L., Mackowski, N.S., Barrett, K.N. and Eckerle, J.J., 2021. The impact of nutritional supplementation on sweat metabolomic content: a proof-of-concept study. Frontiers in Chemistry, 9, p.255.",
      ],
      abstract: [
        "Tok, O., Pellegrino, J., Walker, A., Sanders, D., McFadden, B., Rabideau, M., Conway, S., Ordway, C., Bello, M., Hofacker, M., Mackowski, N., Poyssick, A., Capone, E., Monaco, R., Fragala, M., & Arent, S. (2016). In-season changes in plasma amino acid levels in division I NCAA female athletes. Journal of the International Society of Sports Nutrition, 13, P25.",
        "Walker, A., Conway, S., Hofacker, M., Rabideau, M., McFadden, B., Mackowski, N., Pellegrino, J., Ordway, C., Bello, M., Tok, O., Sanders, D., & Arent, S. (2016). Changes in markers of recovery, readiness, and nutritional status in DI female soccer placers over the first half of the competitive season. Medicine & Science in Sport Exercise, 48, P.S265. ",
        "Hofacker, M., Walker, A., McFadden, B., Rabideau, M., Conway, S., Sanders, D., Mackowski, N., & Arent, S. (2016) Practice vs. competition work rates in collegiate soccer players: do they practice like they play?. Medicine & Science in Sport Exercise, 48, P.S793.",
        "McFadden, B., Walker, A., Hofacker, M., Rabideau, M., Poyssick, A., Conway, S., Pellegrino, J., Mackowski, N., Ordway, C., & Arent, S. (2016). Monitoring the effect of a yearlong training program on power, ventilatory threshold, body composition, and aerobic capacity of division I male college soccer players. Medicine & Science in Sport Exercise, 48, P.S792",
        "Pellegrino, J., Walker, A., Conway, S., Hofacker, M., Rabideau, M., McFadden, B., Mackowski, N., Ordway, C., Bello, M., Tok, O., Sanders, D., & Arent, S. (2016). Biomarker changes in collegiate female power-endurance athletes: the role of fitness as a predictor. Medicine & Science in Sport Exercise, Vol. 48 No. 5, 2016. P.S265",
      ],
      thesis: [
        "Fit survivor: a multi-component health intervention for adolescent and young adult childhood cancer survivors",
      ],
      exp: [
        {
          exptitle:
            "Sr. Analyst, Data Engineering – Logistics Management Institute (LMI)",
          expdesc:
            "I oversee and ensure the efficient management of ETL feeds, leveraging tools such as Informatica PowerCenter. My responsibilities also involve conducting investigations and rectifying any ETL failures. I utilize Teradata and Oracle SQL and for a variety of tasks, including the updating, removal, and retrieval of information from databases. In addition, I perform file alterations using the Linux command line. Furthermore, I work with customers to ensure their data management needs are satisfied.",
        },
        {
          exptitle:
            "Associate Researcher and Sports Scientist – InfoSciTex, Inc. (IST)",
          expdesc:
            "My primary role consisted of research in enhancing the physical and cognitive domains of Airmen and translating any findings to greater empower the impact of unit-embedded human performance staff. I collaborated with the team at the Air Force Research Labs in research design, logistical planning, facility use, data collection, and data analysis. Additionally, I served as an account manager for several units that utilized Smartabase where I developed intake forms, provided analytical support, and created data visualizations.",
        },
        {
          exptitle: "Associate Researcher and Sport Scientist – ORISE",
          expdesc:
            "My role as a DoD Fellow entailed hands-on coaching, development and implementation of performance training for Airmen, and test administration to identify physical performance status and deficits.",
        },
        {
          exptitle:
            "Rutgers Center For Health and Human Performance – Graduate Researcher and Strength & Conditioning Coach",
          expdesc:
            "The research was led through a NIH-funded grant titled “A Novel Mobile Health Fitness Program for AYA Survivors of Childhood Cancer.” Additionally, I had the opportunity to work with adolescents and Division I athletes both as a Graduate Researcher and a S&C Coach. This allowed me to experience the bridge between research and application and the intricacies of each.",
        },
        {
          exptitle:
            "Rutgers Recreation – Assistant Personal Training Coordinator and Strength & Conditioning Coach",
          expdesc:
            "My primary role consisted of coaching individuals, club teams, and ROTC cadets.",
        },
        {
          exptitle: "Rutgers Football – Student Athletic Trainer",
          expdesc:
            "I aided the head and assistant athletic trainers during the in-season, off-season, and training camps with regards to injury prevention, alleviation of illness, and rehabilitation of 70+ football athletes.",
        },
      ],
      school: [
        "M.S. in Kinesiology and Applied Physiology",
        "B.S. in Exercise Science, Applied Kinesiology",
      ],
    };
  },
};
</script>

<style scoped>
@media only screen and (max-width: 900px) {
  .about-me-wrapper {
    flex-direction: column;
  }

  .about-me-skillcerts {
    width: 100%;
    padding-left: 0;
    text-align: center;
  }

  .techskills {
    grid-template-columns: 1fr;
  }

  #profile1 {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
}

.about-me {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
}

.about-me-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#profile1 {
  width: 400px;
  height: 400px;
}

.about-me-profile {
  display: flex;
  align-items: center;
  text-align: center;
}

.about-me-skillcerts {
  align-items: right;
  text-align: center;
  flex-direction: column;
  width: 60%;
  padding-left: 2em;
}

.techskills {
  margin-left: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 10px;
}

.techskills > div:last-child {
  grid-column: 1 / -1;
  text-align: left;
}

.certifications div p {
  text-align: left;
}

.skills,
.certifications,
.publications,
.abstracts,
.experiences,
.thesis,
.education {
  margin-bottom: 2em;
}

h1,
h2,
h3 {
  font-weight: bold;
  width: 100%;
}

ul {
  margin-top: 1em;
}

p {
  margin-top: 0.5em;
}

.exptitle {
  font-weight: bold;
}
</style>
