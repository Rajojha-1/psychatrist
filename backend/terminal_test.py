import asyncio
import os
import sys
from datetime import datetime
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text
from rich.layout import Layout
from dotenv import load_dotenv

load_dotenv(override=True)
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

from app.models import PassBTelemetry, DoctorDossier
from app.evaluator import evaluate_turn
from app.companion import generate_companion_reply
from app.synthesizer import generate_doctor_dossier

console = Console()

async def run_terminal_session():
    console.clear()
    console.print(Panel.fit(
        "[bold cyan]🧠 AI PSYCHIATRIC INTAKE ENGINE — LIVE TERMINAL TESTER[/bold cyan]\n"
        "[dim]Simulating a patient in the waiting room chatting with a human companion while background AI extracts clinical telemetry.[/dim]",
        border_style="cyan"
    ))

    # Initial setup
    conversation_history = []
    telemetry_history = []
    patient_name = None
    session_id = "TERM-" + datetime.now().strftime("%H%M%S")

    # Companion greeting
    initial_greeting = "Hey, take a seat and settle in. Waiting rooms are always pretty dull—what can I call you by the way?"
    conversation_history.append({"role": "assistant", "content": initial_greeting})

    console.print(f"\n[bold green]Companion:[/bold green] {initial_greeting}\n")

    latest_directive = None

    while True:
        try:
            user_input = console.input("[bold yellow]You (Patient): [/bold yellow]").strip()
        except (KeyboardInterrupt, EOFError):
            break

        if not user_input:
            continue

        if user_input.lower() in ["exit", "quit", "report", "done"]:
            console.print("\n[bold magenta]Concluding session and generating Doctor Dossier...[/bold magenta]")
            break

        # Record user turn
        conversation_history.append({"role": "user", "content": user_input})

        with console.status("[cyan]Running Pass B (Clinical Evaluator) & Pass A (Companion)...[/cyan]"):
            # 1. Background Evaluator (Pass B)
            telemetry: PassBTelemetry = await evaluate_turn(
                conversation_history=conversation_history,
                current_patient_name=patient_name
            )
            if telemetry.patient_name and not patient_name:
                patient_name = telemetry.patient_name

            telemetry_history.append(telemetry.model_dump())
            latest_directive = telemetry.steering_directive

            # 2. Companion Response (Pass A)
            reply = await generate_companion_reply(
                conversation_history=conversation_history,
                steering_directive=latest_directive
            )
            conversation_history.append({"role": "assistant", "content": reply})

        # Display Companion's natural reply
        console.print(f"\n[bold green]Companion:[/bold green] {reply}\n")

        # Display Doctor's Secret Telemetry Panel
        table = Table(title=f"🕵️ SECRET CLINICAL TELEMETRY (Turn {len(telemetry_history)})", border_style="dim blue")
        table.add_column("Metric", style="bold cyan", width=22)
        table.add_column("Extracted Data", style="white")

        table.add_row("Patient Name", str(patient_name or "[dim]Not yet confirmed[/dim]"))
        table.add_row("Primary Tone / Affect", f"{telemetry.affect_and_tone.primary_tone} (Valence: {telemetry.affect_and_tone.valence:+.2f}, Arousal: {telemetry.affect_and_tone.arousal_agitation:.2f})")
        table.add_row("Cynicism / Masking", f"{telemetry.affect_and_tone.masking_cynicism_level:.2f}")
        table.add_row("Linguistic Markers", f"Self-Focus: {telemetry.linguistic_analysis.pronoun_density_self_focus:.2f} | Absolutist: {telemetry.linguistic_analysis.absolutist_words_present} | Resignation: {telemetry.linguistic_analysis.negation_fatalism_markers}")
        table.add_row("Cognitive Distortions", ", ".join(telemetry.cognitive_distortions) if telemetry.cognitive_distortions else "[dim]None noted[/dim]")
        table.add_row("Sleep / Somatic", f"{telemetry.somatic_indicators.sleep_status} | Energy: {telemetry.somatic_indicators.energy_and_fatigue}")
        
        # Risk coloring
        risk_color = "green" if telemetry.safety_and_risk.level == "GREEN" else ("yellow" if telemetry.safety_and_risk.level == "AMBER" else "bold red")
        table.add_row("Safety & Risk", f"[{risk_color}]{telemetry.safety_and_risk.level}[/{risk_color}] (Evidence: {telemetry.safety_and_risk.verbatim_evidence})")
        table.add_row("Next Clinical Target", f"[bold magenta]{telemetry.domain_coverage.next_domain_to_explore}[/bold magenta]")
        table.add_row("Intake Completeness", f"[bold]{telemetry.domain_coverage.completeness_score}%[/bold] (Action: {telemetry.session_action} | Turn {len(telemetry_history)}/9+)")
        table.add_row("Secret Steering Directive", f"[yellow]'{telemetry.steering_directive}'[/yellow]")

        console.print(Panel(table, border_style="blue", title="[bold white on blue] DOCTOR MONITOR (HIDDEN FROM PATIENT) [/bold white on blue]"))
        console.print("[dim]Type your next reply, or type 'report' to view the final Doctor Dossier.[/dim]\n")

        if telemetry.session_action == "INITIATE_WRAPUP":
            console.print("[bold green]✨ Intake completeness reached! You can type 'report' anytime to conclude.[/bold green]\n")

    # Conclude and print Doctor Dossier
    if len(conversation_history) > 1:
        with console.status("[bold magenta]Synthesizing Board-Certified Psychiatric Dossier (Pass C)...[/bold magenta]"):
            dossier: DoctorDossier = await generate_doctor_dossier(
                session_id=session_id,
                patient_name=patient_name or "Waiting Room Patient",
                conversation_history=conversation_history,
                telemetry_history=telemetry_history
            )

        console.clear()
        console.print(Panel.fit(
            f"[bold red]📋 CONFIDENTIAL PSYCHIATRIC CLINICAL DOSSIER[/bold red]\n"
            f"[white]Patient: {dossier.executive_summary.patient_name} | Session ID: {session_id} | Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}[/white]",
            border_style="red"
        ))

        # 1. Executive Summary
        exec_panel = (
            f"[bold]Provisional Diagnosis:[/bold] {dossier.executive_summary.provisional_diagnostic_impression}\n"
            f"[bold]Acute Severity:[/bold] {dossier.executive_summary.acute_severity_status}\n\n"
            f"[bold]Clinical Synopsis:[/bold]\n{dossier.executive_summary.clinical_synopsis}"
        )
        console.print(Panel(exec_panel, title="[bold]1. EXECUTIVE CLINICAL SUMMARY (60-SEC BRIEF)[/bold]", border_style="cyan"))

        # 2. Mental Status Exam
        mse = dossier.mental_status_exam
        mse_table = Table(title="2. FORMAL MENTAL STATUS EXAMINATION (MSE)", border_style="green")
        mse_table.add_column("Domain", style="bold green", width=25)
        mse_table.add_column("Clinical Findings", style="white")
        mse_table.add_row("Appearance & Engagement", mse.appearance_and_engagement)
        mse_table.add_row("Speech & Psychomotor", mse.speech_and_psychomotor)
        mse_table.add_row("Subjective Mood", mse.mood_subjective)
        mse_table.add_row("Objective Affect", mse.affect_objective)
        mse_table.add_row("Thought Process", mse.thought_process)
        mse_table.add_row("Thought Content", mse.thought_content)
        mse_table.add_row("Cognitive Distortions", "\n".join(mse.cognitive_distortions_detailed))
        console.print(mse_table)

        # 3. Somatic Profile
        som = dossier.somatic_profile
        console.print(Panel(
            f"[bold]Sleep Architecture:[/bold] {som.sleep_architecture}\n"
            f"[bold]Energy & Neurovegetative:[/bold] {som.energy_and_neurovegetative}\n"
            f"[bold]Somatic Complaints:[/bold] {', '.join(som.somatic_complaints)}",
            title="[bold]3. SOMATIC & NEUROVEGETATIVE PROFILE[/bold]",
            border_style="yellow"
        ))

        # 4. Action Plan for Doctor
        angles = "\n".join([f"• {a}" for a in dossier.attending_physician_consultation_angles])
        screens = ", ".join(dossier.recommended_screening_instruments)
        console.print(Panel(
            f"[bold cyan]High-Yield Consultation Questions To Ask Patient:[/bold cyan]\n{angles}\n\n"
            f"[bold]Recommended Screening Instruments:[/bold] {screens}",
            title="[bold]4. ATTENDING PHYSICIAN HIGH-YIELD ACTION PLAN[/bold]",
            border_style="magenta"
        ))

if __name__ == "__main__":
    asyncio.run(run_terminal_session())
